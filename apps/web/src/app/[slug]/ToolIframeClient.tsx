'use client';

import { useRef, useState, useEffect } from 'react';

interface Props {
  customHtml: string | null;
  customCss: string | null;
  customJs: string | null;
  title: string;
}

export function ToolIframeClient({ customHtml, customCss, customJs, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    const handleIframeResize = (event: MessageEvent) => {
      if (event.data?.type !== 'tool-iframe-height') return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const nextHeight = Number(event.data.height);
      if (!Number.isFinite(nextHeight)) return;
      setIframeHeight(Math.max(600, Math.ceil(nextHeight)));
    };
    window.addEventListener('message', handleIframeResize);
    return () => window.removeEventListener('message', handleIframeResize);
  }, []);

  const srcDoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;}${customCss || ''}</style></head><body>${customHtml || ''}<script>${customJs || ''};(() => {const sendHeight=()=>{const root=document.documentElement;const body=document.body;const height=Math.max(root?root.scrollHeight:0,root?root.offsetHeight:0,body?body.scrollHeight:0,body?body.offsetHeight:0);window.parent.postMessage({ type: 'tool-iframe-height', height }, '*');};window.addEventListener('load',sendHeight);window.addEventListener('resize',sendHeight);if('ResizeObserver' in window){const observer=new ResizeObserver(sendHeight);if(document.body) observer.observe(document.body);if(document.documentElement) observer.observe(document.documentElement);}setInterval(sendHeight,500);sendHeight();})();<\/script></body></html>`;

  return (
    <section className="bg-gray-50">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        className="w-full border-0"
        style={{ height: `${iframeHeight}px` }}
        srcDoc={srcDoc}
        title={title}
      />
    </section>
  );
}
