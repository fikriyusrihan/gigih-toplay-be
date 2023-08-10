class UserService {
  constructor(user) {
    this.user = user;

    this.getUserById = this.getUserById.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getUserById(id) {
    return this.user.findById(id);
  }

  async getUserByEmail(email) {
    return this.user.findOne({ email });
  }

  async createUser(userBody) {
    return this.user.create(userBody);
  }
}

export default UserService;
