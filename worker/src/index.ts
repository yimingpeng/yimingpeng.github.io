import { portfolioKnowledge, sourceLabels } from './knowledge';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
	role: ChatRole;
	content: string;
}

interface ChatRequest {
	message?: unknown;
	history?: unknown;
}

interface Env {
	AI: Ai;
	RATE_LIMITS: KVNamespace;
	ALLOWED_ORIGINS?: string;
	ASSISTANT_MODEL?: string;
}

const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';
const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_MESSAGES = 12;
const MAX_HISTORY_CONTENT_LENGTH = 1000;
const DAILY_IP_LIMIT = 10;
const DAILY_GLOBAL_LIMIT = 200;
const RATE_LIMIT_TTL_SECONDS = 60 * 60 * 30;

export default {
	async fetch(request, env): Promise<Response> {
		const origin = request.headers.get('Origin') ?? '';
		const allowedOrigin = getAllowedOrigin(origin, env);

		if (request.method === 'OPTIONS') {
			return allowedOrigin
				? new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) })
				: json({ error: 'Origin is not allowed.' }, 403);
		}

		if (!allowedOrigin) {
			return json({ error: 'Origin is not allowed.' }, 403);
		}

		if (request.method !== 'POST' || new URL(request.url).pathname !== '/chat') {
			return json({ error: 'Not found.' }, 404, allowedOrigin);
		}

		let payload: ChatRequest;
		try {
			payload = (await request.json()) as ChatRequest;
		} catch {
			return json({ error: 'Request body must be valid JSON.' }, 400, allowedOrigin);
		}

		const validation = validateChatRequest(payload);
		if ('error' in validation) {
			return json({ error: validation.error }, 400, allowedOrigin);
		}

		const limit = await checkDailyLimits(request, env);
		if (!limit.allowed) {
			return json(
				{
					error:
						'Daily assistant limit reached. Please try again tomorrow or contact Yiming by email.'
				},
				429,
				allowedOrigin
			);
		}

		try {
			const answer = await generateAnswer(validation.message, validation.history, env);
			return json({ answer, sources: sourceLabels }, 200, allowedOrigin);
		} catch {
			return json(
				{
					error:
						'The assistant is temporarily unavailable. Please try again later or contact Yiming by email.'
				},
				502,
				allowedOrigin
			);
		}
	}
} satisfies ExportedHandler<Env>;

function getAllowedOrigin(origin: string, env: Env): string | null {
	const configured = env.ALLOWED_ORIGINS?.split(',').map(value => value.trim()) ?? [];
	const allowed = new Set([
		'https://yimingpeng.github.io',
		'http://localhost:4321',
		'http://127.0.0.1:4321',
		...configured
	]);

	return allowed.has(origin) ? origin : null;
}

function corsHeaders(origin: string): HeadersInit {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400',
		Vary: 'Origin'
	};
}

function json(body: unknown, status: number, origin?: string): Response {
	const headers: HeadersInit = {
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store'
	};

	if (origin) {
		Object.assign(headers, corsHeaders(origin));
	}

	return Response.json(body, { status, headers });
}

function validateChatRequest(
	payload: ChatRequest
): { message: string; history: ChatMessage[] } | { error: string } {
	if (typeof payload.message !== 'string') {
		return { error: 'Message is required.' };
	}

	const message = payload.message.trim();
	if (!message) {
		return { error: 'Message cannot be empty.' };
	}

	if (message.length > MAX_MESSAGE_LENGTH) {
		return { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` };
	}

	const rawHistory = Array.isArray(payload.history) ? payload.history : [];
	const history = rawHistory
		.filter(isChatMessage)
		.slice(-MAX_HISTORY_MESSAGES)
		.map(item => ({
			role: item.role,
			content: item.content.trim().slice(0, MAX_HISTORY_CONTENT_LENGTH)
		}))
		.filter(item => item.content.length > 0);

	return { message, history };
}

function isChatMessage(value: unknown): value is ChatMessage {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const candidate = value as Record<string, unknown>;
	return (
		(candidate.role === 'user' || candidate.role === 'assistant') &&
		typeof candidate.content === 'string'
	);
}

async function checkDailyLimits(
	request: Request,
	env: Env
): Promise<{ allowed: boolean; reason?: string }> {
	const day = new Date().toISOString().slice(0, 10);
	const ipHash = await hashIp(request.headers.get('CF-Connecting-IP') ?? 'unknown');
	const ipKey = `assistant:${day}:ip:${ipHash}`;
	const globalKey = `assistant:${day}:global`;

	const ipAllowed = await incrementCounter(env.RATE_LIMITS, ipKey, DAILY_IP_LIMIT);
	if (!ipAllowed) {
		return { allowed: false, reason: 'ip' };
	}

	const globalAllowed = await incrementCounter(env.RATE_LIMITS, globalKey, DAILY_GLOBAL_LIMIT);
	if (!globalAllowed) {
		return { allowed: false, reason: 'global' };
	}

	return { allowed: true };
}

async function incrementCounter(
	namespace: KVNamespace,
	key: string,
	limit: number
): Promise<boolean> {
	const current = Number((await namespace.get(key)) ?? '0');
	if (current >= limit) {
		return false;
	}

	await namespace.put(key, String(current + 1), { expirationTtl: RATE_LIMIT_TTL_SECONDS });
	return true;
}

async function hashIp(ip: string): Promise<string> {
	const data = new TextEncoder().encode(ip);
	const digest = await crypto.subtle.digest('SHA-256', data);
	const bytes = [...new Uint8Array(digest)];
	return bytes
		.map(byte => byte.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, 24);
}

async function generateAnswer(message: string, history: ChatMessage[], env: Env): Promise<string> {
	const systemPrompt = [
		'You are Ask Yiming, a portfolio assistant for Yiming Peng.',
		'Answer only from the supplied portfolio knowledge.',
		'If the knowledge does not contain the answer, say you do not know from the portfolio.',
		'Do not infer private details, salary, availability, immigration status, or confidential work.',
		'Keep answers concise, accurate, and under 300 words.',
		'Use first person only when clearly speaking as the website assistant, not as Yiming.',
		'Portfolio knowledge:',
		portfolioKnowledge
	].join('\n');

	const messages = [
		{ role: 'system', content: systemPrompt },
		...history,
		{ role: 'user', content: message }
	];
	const model = env.ASSISTANT_MODEL || DEFAULT_MODEL;
	const response = await env.AI.run(model, {
		messages,
		max_tokens: 500,
		temperature: 0.2
	});

	return extractAiText(response);
}

function extractAiText(response: unknown): string {
	if (typeof response === 'string') {
		return response.trim();
	}

	if (!response || typeof response !== 'object') {
		throw new Error('Unexpected AI response.');
	}

	const result = response as {
		response?: unknown;
		text?: unknown;
		result?: { response?: unknown; text?: unknown };
	};
	const text = result.response ?? result.text ?? result.result?.response ?? result.result?.text;

	if (typeof text !== 'string' || !text.trim()) {
		throw new Error('AI response did not include text.');
	}

	return text.trim();
}
