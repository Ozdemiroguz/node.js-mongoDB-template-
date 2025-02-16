class AppError extends Error {
  constructor(data, status) {
    super(data);
    this.message = data.message || data;
    this.status = status;
    this.code = data.code;
  }
}

module.exports = AppError;
