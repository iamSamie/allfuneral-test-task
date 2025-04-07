import {
  SVGProps,
  Suspense,
  lazy,
  useMemo,
} from 'react';
import styles from './svg-icon.module.sass';

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

export const SvgIcon = ({ className = '', name, ...props }: SvgIconProps) => {
  const DynamicComponent = useMemo(() => {
    return lazy(() => import(`./svg/${name}.svg?react`));
  }, [name]);

  const resultedClassName = `${className} ${styles.icon}`.trim();

  return (
    <Suspense fallback={<svg {...props} />}>
      <DynamicComponent className={resultedClassName} {...props} />
    </Suspense>
  );
};
