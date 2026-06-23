import { PUBLIC_API_BASE_URL } from '$env/static/public';

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(
			`API request failed: ${response.status} ${response.statusText}`
		);
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return (await response.json()) as T;
}

function buildUrl(path: string): string {
	return `${PUBLIC_API_BASE_URL}${path}`;
}

export async function apiGet<T>(
	fetchFn: typeof fetch,
	path: string
): Promise<T> {
	const response = await fetchFn(buildUrl(path));

	return handleResponse<T>(response);
}

export async function apiPost<TResponse, TRequest = unknown>(
	fetchFn: typeof fetch,
	path: string,
	body: TRequest
): Promise<TResponse> {
	const response = await fetchFn(buildUrl(path), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	return handleResponse<TResponse>(response);
}

export async function apiPut<TResponse, TRequest = unknown>(
	fetchFn: typeof fetch,
	path: string,
	body: TRequest
): Promise<TResponse> {
	const response = await fetchFn(buildUrl(path), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	return handleResponse<TResponse>(response);
}

export async function apiDelete<TResponse = void>(
	fetchFn: typeof fetch,
	path: string
): Promise<TResponse> {
	const response = await fetchFn(buildUrl(path), {
		method: 'DELETE'
	});

	return handleResponse<TResponse>(response);
}