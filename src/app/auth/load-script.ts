const scripts: any = {};
export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    // resolve if already loaded
    if (scripts[src]) {
      resolve();
    } else {
      // load script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => {
        scripts[src] = true;
        resolve();
      };
      script.onerror = reject;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  });
}
