
export default defineNuxtPlugin((nuxtApp) => {
  if (process.dev) return

  const node = document.createElement('script');
  node.async = true;
  node.src = 'https://umami-zernonia.vercel.app/script.js';
  node.setAttribute('data-website-id', '545e8bc4-f448-4790-8f28-eaa11d690fb4');
  node.setAttribute('data-domains', 'madewithsupabase.com');

  document.body.appendChild(node);
})
