export interface loginUser {
    username: string,
    email: string,
    password: string
  }
  
  export interface mongooseUser {
    username: string,
    firstname: string,
    lastname: string,
    password?: string
    email?: string,
    img?: string,
    created_date?: any
  }
  