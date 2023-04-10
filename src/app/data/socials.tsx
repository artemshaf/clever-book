import { Icon } from '../components/ui';

interface ISocialCommon {
  link: string;
}

interface ITextSocial extends ISocialCommon {
  text: string;
  icon?: never;
}

interface IIconSocial extends ISocialCommon {
  text?: never;
  icon: JSX.Element;
}

export type ISocial = ITextSocial | IIconSocial;

export const socialsList: ISocial[] = [
  {
    link: 'https://vk.com/artsss02',
    icon: <Icon icon='Facebook' />,
  },
  {
    link: 'https://vk.com/artsss02',
    icon: <Icon icon='Instagram' />,
  },
  {
    link: 'https://vk.com/artsss02',
    icon: <Icon icon='Vk' />,
  },
  {
    link: 'https://vk.com/artsss02',
    icon: <Icon icon='Linkedin' />,
  },
];
