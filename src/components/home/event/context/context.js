// import React, { Context, useContext, useState } from 'react';
// import { EventModal } from '../components';

// const EventContext = React.createContext(null);

// const EventContextProvider = () => Component => {
//   const [event, setEvent] = useState(event || null);
//   const [show, setShow] = useState(false);

//   const handleShow = () => setShow(!show);

//   const modalProps = {
//     end: event.end,
//     handleShow,
//     show,
//     start: event.start,
//     title: event.title,
//     update: event.update,
//   };

//   return (
//     <EventContext.Provider value={{ event, setEvent }}>
//       <Component />
//       <EventModal {...modalProps} />
//     </EventContext.Provider>
//   );
// };

// export { EventContext, EventContextProvider };
