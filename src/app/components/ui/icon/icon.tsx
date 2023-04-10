import { IconProps, importedIcons } from './icon-types';

export const Icon = ({ icon, ...props }: IconProps) => {
  const CurrentIcon = importedIcons[icon];

  return <CurrentIcon {...props} />;
};
