const isAdmin = ({ roles }) => roles.includes('ROLE_ADMIN');

const isOwner = ({ id }, ownerId) => id === ownerId;

const hasEditAcces = (user, ownerId) => isOwner(user, ownerId) || isAdmin(user);

export { isAdmin, isOwner, hasEditAcces };
