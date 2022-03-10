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
declare module 'react-mathjax';
