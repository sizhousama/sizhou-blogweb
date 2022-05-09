declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.scss';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'react-keyboard-event-handler';
declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/esm/styles/prism';
declare module 'react-mathjax';
declare module 'js-cookie';
