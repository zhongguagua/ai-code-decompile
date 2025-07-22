export function getFrom() {
    const params = new URLSearchParams(window.location.search);

    // 尝试从查询参数中获取 'from'，如果没有则尝试获取 'ref'
    let fromArgs = params.get('from') || params.get('ref') || 'web';
    return fromArgs;
}
