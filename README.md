# library

// vite-dual-css-plugin.js
export default function viteDualCssPlugin() {
  return {
    name: 'vite-dual-css-plugin',
    generateBundle(options, bundle) {
      // Find the main CSS file in the bundle
      const cssAssets = Object.keys(bundle).filter(key => key.endsWith('.css'));
      
      for (const cssAsset of cssAssets) {
        if (cssAsset.startsWith('main-') || cssAsset.startsWith('style') || cssAsset === 'index.css') {
          const originalCss = bundle[cssAsset].source;
          const fileName = cssAsset.replace('.css', '-wrapped.css');
          
          // Create wrapped version by prefixing all selectors with #app
          let wrappedCss = originalCss.replace(
            /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g, 
            '#app $1$2'
          );
          
          // Handle media queries and keyframes which shouldn't be wrapped
          wrappedCss = wrappedCss
            .replace(/#app (@media[^{]+){/g, '$1{')
            .replace(/#app (@keyframes[^{]+){/g, '$1{')
            .replace(/#app (@supports[^{]+){/g, '$1{');
          
          // Add the wrapped CSS as a new file in the bundle
          this.emitFile({
            type: 'asset',
            fileName,
            source: wrappedCss
          });
        }
      }
    }
  };
}
