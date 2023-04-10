export type IClassNames = {
  [className: string]: string;
};

declare module '*.module.css' {
  const classes: IClassNames;
}

declare module '*.module.scss' {
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.module.sass' {
  const classes: IClassNames;
}

declare module '*.module.less' {
  const classes: IClassNames;
}

declare module '*.module.styl' {
  const classes: IClassNames;
}
