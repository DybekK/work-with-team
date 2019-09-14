export interface loginUser {
    username: string,
    email: string,
    password: string
  }
  
  export interface mongooseUser {
    _id?: any,
    username: string,
    firstname: string,
    lastname: string,
    password?: string
    email?: string,
    img?: string,
    tags: Array<tag>
    created_date?: any
  }
  
  export interface postTask {
    _id?: any,
    taskname: string,
    description?: string,
    priority: number,
    repetition?: string,
    date_from?: string,
    date_to?: string,
    created_date?: any
  }

  export interface tag{
    _id?: any,
    tagname: string,
    created_date?: any
  }