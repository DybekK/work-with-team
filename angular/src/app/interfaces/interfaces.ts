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
  
  export interface postTask {
    taskname: string,
    description?: string,
    priority: number,
    repetition?: string,
    date_from?: string,
    date_to?: string,
    created_date?: any
  }