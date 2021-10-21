const correlationId = 123456;
export function trace (message = "", component = "") {
    console.info(JSON.stringify({correlationId, message, component, timestamp: performance.now(),}))
}
