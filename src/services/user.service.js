class UserService {
  constructor(user) {
    this.user = user;

    this.getUserByEmail = this.getUserByEmail.bind(this);
  }

  async getUserByEmail(email) {
    return this.user.findOne({ email });
  }

  async createUser(userBody) {
    return this.user.create(userBody);
  }
}

export default UserService;
