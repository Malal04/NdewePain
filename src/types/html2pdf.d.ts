// src/types/html2pdf.d.ts

declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | [number, number, number, number];
      filename?: string;
      image?: {
        type?: string;
        quality?: number;
      };
      html2canvas?: {
        scale?: number;
        logging?: boolean;
        useCORS?: boolean;
      };
      jsPDF?: {
        unit?: string;
        format?: string | [number, number];
        orientation?: 'portrait' | 'landscape';
      };
    }
  
    function html2pdf(): {
      set: (options: Html2PdfOptions) => any;
      from: (element: HTMLElement) => {
        save: () => void;
      };
    };
  
    export = html2pdf;
}
  