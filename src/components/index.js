import loadable from '@loadable/component';

const Alert = loadable(() => import('./Alert'));
const BoardDisplay = loadable(() => import('./BoardDisplay'));
const Header = loadable(() => import('./Header'));
const Spinner = loadable(() => import('./Spinner'));

const Users = loadable(() => import('./users/users'));
const User = loadable(() => import('./users/user'));

const SkeletonCard = loadable(() => import('./skeletons/SkeletonCard'));
const SkeletonsList = loadable(() => import('./skeletons/SkeletonsList'));
const Shimmer = loadable(() => import('./skeletons/Shimmer'));
const SkeletonElement = loadable(() => import('./skeletons/SkeletonElement'));

const Request = loadable(() => import('./requests/request'));
const Requests = loadable(() => import('./requests/requests'));
const RequestConfirmationForm = loadable(() =>
  import('./requests/RequestConfirmationForm')
);

const Notifications = loadable(() => import('./notifications/Notifications'));
const Notification = loadable(() => import('./notifications/Notification'));
const NotificationReadButton = loadable(() =>
  import('./notifications/NotificationReadButton')
);

const Holiday = loadable(() => import('./holidays/holiday'));
const Holidays = loadable(() => import('./holidays/holidays'));

const CountdownCancel = loadable(() => import('./forms/CountdownCancel'));
const NewRequestForm = loadable(() => import('./forms/NewRequestForm'));
const Status = loadable(() => import('./forms/Status'));
const SuccessButton = loadable(() => import('./forms/CountdownButtons'), {
  resolveComponent: (mod) => mod.SuccessButton,
});
const NegativeButton = loadable(() => import('./forms/CountdownButtons'), {
  resolveComponent: (mod) => mod.NegativeButton,
});

const Event = loadable(() => import('./event/Event'));
const EventModal = loadable(() =>
  import(/* webpackPrefetch: true */ './event/EventModal')
);
const RequestsTable = loadable(() => import('./event/RequestsTable'));

export {
  Alert,
  BoardDisplay,
  Event,
  EventModal,
  RequestsTable,
  CountdownCancel,
  NewRequestForm,
  Status,
  SuccessButton,
  NegativeButton,
  Header,
  Holiday,
  Holidays,
  Request,
  RequestConfirmationForm,
  Requests,
  Notification,
  Notifications,
  NotificationReadButton,
  Shimmer,
  SkeletonElement,
  SkeletonsList,
  SkeletonCard,
  Spinner,
  User,
  Users,
};
