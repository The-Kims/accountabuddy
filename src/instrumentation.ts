export async function register() {
  const IS_BROWSER = typeof window !== 'undefined';
  const MSW_ENABLED = process.env.MSW_ENABLED;
  const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
  const IS_NODE = process.env.NEXT_RUNTIME === 'nodejs';

  if (IS_DEVELOPMENT && MSW_ENABLED) {
    if (IS_BROWSER) {
      const { worker } = await import('./mocks/browser');
      worker.start();
    } else if (IS_NODE) {
      const { server } = await import('./mocks/server');
      server.listen();
    }
  }
}
