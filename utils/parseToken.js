export function parseToken(token) {
	// 将token分割为三部分
	const [header, payload, signature] = token.split('.');
	if (!header || !payload || !signature) {
		throw new Error('Invalid token format');
	}
	// 解码Header和Payload
	const decodedHeader = JSON.parse(Buffer.from(header, 'base64').toString());
	const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
	// 返回解码后的Payload，通常包含用户信息
	return {
		header: decodedHeader,
		payload: decodedPayload,
	};
}