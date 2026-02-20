interface IUserProps {
  name: string;
  username: string;
  email: string;
}

interface IUserUpdateProps {
  name?: string;
  username?: string;
  email?: string;
}

class User {
  id?: string;
  name: string;
  username: string;
  email: string;

  private constructor({ name, username, email }: IUserProps) {
    return Object.assign(this, {
      name,
      username,
      email,
    });
  }

  static create({ name, username, email }: IUserProps): User {
    const user = new User({ username, name, email });
    return user;
  }
}

export { User, IUserProps, IUserUpdateProps };
