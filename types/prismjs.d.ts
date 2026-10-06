declare module "prismjs" {
  const Prism: {
    languages: Record<string, object>;
    highlight(code: string, grammar: object, language: string): string;
  };
  export default Prism;
}

declare module "prismjs/components/prism-java";
declare module "prismjs/components/prism-typescript";
declare module "prismjs/components/prism-jsx";
declare module "prismjs/components/prism-tsx";
