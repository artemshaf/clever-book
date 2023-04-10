import { ReactComponent as AddUser } from './icons/add-user.svg';
import { ReactComponent as CircleSuccess } from './icons/circle-success.svg';
import { ReactComponent as DropDown } from './icons/drop-down.svg';
import { ReactComponent as ArrowLeft } from './icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from './icons/arrow-right.svg';
import { ReactComponent as BellSimple } from './icons/bell-simple.svg';
import { ReactComponent as Calendar } from './icons/calendar.svg';
import { ReactComponent as Cart } from './icons/cart.svg';
import { ReactComponent as CheckCircle } from './icons/check-circle.svg';
import { ReactComponent as Close } from './icons/close.svg';
import { ReactComponent as Default } from './icons/default.svg';
import { ReactComponent as Delete } from './icons/delete.svg';
import { ReactComponent as Divider } from './icons/divider.svg';
import { ReactComponent as Document } from './icons/document.svg';
import { ReactComponent as Down } from './icons/down.svg';
import { ReactComponent as EyeClose } from './icons/eye-closed.svg';
import { ReactComponent as EyeOpen } from './icons/eye-open.svg';
import { ReactComponent as Facebook } from './icons/facebook.svg';
import { ReactComponent as Filter } from './icons/filter.svg';
import { ReactComponent as FullCat } from './icons/full-cat.svg';
import { ReactComponent as IconCat } from './icons/icon-cat.svg';
import { ReactComponent as Info } from './icons/info.svg';
import { ReactComponent as Instagram } from './icons/instagram.svg';
import { ReactComponent as Left } from './icons/left.svg';
import { ReactComponent as Linkedin } from './icons/llinkedin.svg';
import { ReactComponent as Loader } from './icons/loader.svg';
import { ReactComponent as Logo } from './icons/logo.svg';
import { ReactComponent as Menu } from './icons/menu.svg';
import { ReactComponent as More } from './icons/more.svg';
import { ReactComponent as Outline } from './icons/outline.svg';
import { ReactComponent as Pencil } from './icons/pencil.svg';
import { ReactComponent as Photo } from './icons/photo.svg';
import { ReactComponent as Right } from './icons/right.svg';
import { ReactComponent as Search } from './icons/search.svg';
import { ReactComponent as Share } from './icons/share.svg';
import { ReactComponent as SortAsc } from './icons/sort-ascending.svg';
import { ReactComponent as SortDesc } from './icons/sort-descending.svg';
import { ReactComponent as SquareFour } from './icons/square-four.svg';
import { ReactComponent as StarEmpty } from './icons/star-empty.svg';
import { ReactComponent as StarFull } from './icons/star-full.svg';
import { ReactComponent as ToastNegative } from './icons/toast-negative.svg';
import { ReactComponent as ToastPositive } from './icons/toast-positive.svg';
import { ReactComponent as Up } from './icons/up.svg';
import { ReactComponent as Vk } from './icons/vk.svg';
import { ReactComponent as Warning } from './icons/warning.svg';
import { ReactComponent as WarningCircle } from './icons/warning-circle.svg';

export const importedIcons = {
  StarFull,
  DropDown,
  CircleSuccess,
  StarEmpty,
  Logo,
  AddUser,
  ArrowLeft,
  ArrowRight,
  BellSimple,
  Calendar,
  Cart,
  CheckCircle,
  Close,
  Default,
  Delete,
  Divider,
  Document,
  Down,
  EyeClose,
  EyeOpen,
  Facebook,
  Filter,
  FullCat,
  IconCat,
  Instagram,
  Left,
  Linkedin,
  Menu,
  Info,
  More,
  Outline,
  Pencil,
  Photo,
  Right,
  Search,
  Share,
  SortAsc,
  SortDesc,
  SquareFour,
  ToastNegative,
  ToastPositive,
  Loader,
  Up,
  Vk,
  Warning,
  WarningCircle,
};

export type IconName = keyof typeof importedIcons;

export type IconProps = React.SVGProps<SVGSVGElement> & {
  icon: IconName;
};
