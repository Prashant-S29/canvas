import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [isCopied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
        .catch((error) => {
          console.error('Failed to copy:', error);
        });
    }
  };

  return { isCopied, copyToClipboard };
};
