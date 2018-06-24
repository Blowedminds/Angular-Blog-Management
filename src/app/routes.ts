export const routes: any = {
  auth: {
    url: 'auth/',
    'register': { url: 'register/' },
    'is-authenticated': { url: 'is-authenticated/' },
    'login': { url: 'login/' },
    'logout': { url: 'logout/' }
  },
  article: {
    url: 'article/',
    'article': { url: 'article/' },
    'restore': { url: 'restore/' },
    'force-delete': { url: 'force-delete/' },
    'permission': { url: 'permission/' },
    'content': { url: 'content/' },
    'articles': { url: 'articles/' },
    'trash': { url: 'trashed-articles/' },
  },
  admin: {
    url: 'admin/',
    'languages': { url: 'languages/' },
    'categories': { url: 'categories/' },
    'menus': { url: 'menus/' },
    'users': { url: 'users/' },
    'roles': { url: 'roles/' },
    'user': { url: 'user/' },
  },
  image: {
    url: 'image/',
    'image': { url: 'image/' },
    'thumb': { url: 'thumb/' },
    'images': { url: 'images/' },
    'edit': { url: 'edit/' }
  },
  user: {
    url: 'user/',
    'info': { url: 'info/' },
    'menus': { url: 'menus/en/' },
    'dashboard': { url: 'dashboard/' },
    'management': { url: 'management/' },
    'profile-image': { url: 'profile-image/' },
    'profile': { url: 'profile/' }
  },
  public: {
    url: '',
    'image': {
      url: 'images/',
      'author': { url: 'author/' }
    }
  }
};
