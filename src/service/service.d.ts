interface IBaseResponse<T = null> {
  code: 0 | 404;
  data: T;
  msg: string;
}
type TLoginResponse = IBaseResponse<{
  accessToken: string;
  refreshToken: string;
  csrf: string;
}>;
type TOverviewData = IBaseResponse<{
  taskCount: number;
  done: number;
  undone: number;
  overdue: number;
  unreceived: number;
  dueToday: number;
  completedOverdue: number;
  taskPriority: {
    [key: string]: number;
  };
  taskState: {
    [key: string]: number;
  };
  taskType: {
    [key: string]: number;
  };
}>;
type TaskLogData = IBaseResponse<{
  count: number;
  rows: {
    id: number;
    remark: string;
    task_id: number;
    project_id: number;
    operator_id: number;
    icon: string;
    content: string;
    is_comment: number;
    type: string;
    created_at: string;
    updated_at: string;
    operator: {
      id: number;
      user_id_github: number;
      username: string;
      department_id: number | null;
      nickname: string;
      password: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      deleted_at: string | null;
    };
    task: { id: number; name: string };
  };
}>;
type TAllItem = IBaseResponse<{
  count: number;
  rows: {
    id: number;
    name: string;
    parent_id: number;
    manager_id: number;
    project_template_id: number;
    progress: number;
    cover: string;
    is_recycle: number;
    is_archived: number;
    is_private: number;
    is_auto_progress: number;
    state: number;
    intro: string;
    created_at: string;
    updated_at: string;
    creator: {
      username: string;
      id: number;
      avatar: string;
    };
    collector: never[]; // Assuming it's an array of any type
    member: {
      id: number;
      user_id_github: number;
      username: string;
      department_id: number | null;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      user_projects: {
        id: number;
        user_id: number;
        project_id: number;
        created_at: string;
        updated_at: string;
      };
    };
  };
}>;
// 路由
type TLayout = IBaseResponse<
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: string;
    component: string | (() => Promise<any>);
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  }[]
>;
type TUserInformation = IBaseResponse<IUserInformationData>;

interface IUserInformationData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  roles: IUserInformationRole[];
  permissions: string[];
}

interface IUserInformationRole {
  id: number;
  name: string;
  is_default: number;
  created_at: string;
  updated_at: string;
  user_roles: IUserInformationUserprofile;
  permissions: IUserInformationPermission[];
}

interface IUserInformationPermission {
  id: number;
  url: string;
  action: string;
  role_permissions: IUserInformationRoperMissions;
}

interface IUserInformationRoperMissions {
  id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  updated_at: string;
}

interface IUserInformationUserprofile {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}
type ResponseDataRows = {
  code: number;
  data: {
    count: number;
    rows: [
      {
        id: number;
        name: string;
        parent_id: number;
        manager_id: number;
        project_template_id: number;
        progress: number;
        cover: string;
        is_recycle: number;
        is_archived: number;
        is_private: number;
        is_auto_progress: number;
        state: number;
        intro: string;
        created_at: string;
        updated_at: string;
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
          id: number;
          user_id_github: number;
          username: string;
          department_id: object;
          nickname: string;
          email: string;
          state: number;
          phone: string;
          avatar: string;
          company: string;
          city: string;
          last_login: string;
          created_at: string;
          updated_at: string;
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      }
    ];
  };
  msg: string;
};
type ResponseData_1 = {
  code: number;
  data: {
    filename: string;
    path: string;
    file_type: string;
    size: string;
    extension: string;
  };
  msg: string;
};
type Project_templatesList = {
  code: number;
  data: {
    count: number;
    rows: [
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: {
          id: number;
          name: string;
          project_template_id: number;
          sort: number;
        }[];
      },
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: {
          id: number;
          name: string;
          project_template_id: number;
          sort: number;
        }[];
      }
    ];
  };
  msg: string;
};
type TUser_info = {
  code?: number;
  data: {
    id: number;
    user_id_github: number;
    username: string;
    department_id: object;
    nickname: string;
    email: string;
    state: number;
    phone: string;
    avatar: string;
    company: string;
    city: string;
    last_login: string;
    created_at: string;
    updated_at: string;
    roles: {
      id: number;
      name: string;
      is_default: number;
      created_at: string;
      updated_at: string;
      user_roles: {
        id: number;
        user_id: number;
        role_id: number;
        created_at: string;
        updated_at: string;
      };
      permissions: {
        id: number;
        url: string;
        action: string;
        role_permissions: {
          id: number;
          role_id: number;
          permission_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }[];
    permissions: string[];
  };
  msg?: string;
};
type TsungCurrentData = {
  id: number;
  name: string;
  parent_id: number;
  manager_id: number;
  project_template_id: number;
  progress: number;
  cover: string;
  is_recycle: number;
  is_archived: number;
  is_private: number;
  is_auto_progress: number;
  state: number;
  intro: string;
  created_at: string;
  updated_at: string;
  creator: { username: string; id: number; avatar: string };
  collector: {
    id: number;
    user_id_github: number;
    username: string;
    department_id: object;
    nickname: string;
    email: string;
    state: number;
    phone: string;
    avatar: string;
    company: string;
    city: string;
    last_login: string;
    created_at: string;
    updated_at: string;
    deleted_at: object;
    user_project_collects: {
      id: number;
      user_id: number;
      project_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
  member: {
    id: number;
    user_id_github: number;
    username: string;
    department_id: object;
    nickname: string;
    email: string;
    state: number;
    phone: string;
    avatar: string;
    company: string;
    city: string;
    last_login: string;
    created_at: string;
    updated_at: string;
    deleted_at: object;
    user_projects: {
      id: number;
      user_id: number;
      project_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
};
type TDepartmentInformation = IBaseResponse<IDepartment, NameResponse>;
interface IDepartment {
  count: number;
  rows: [
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: undefined[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    },
    {
      id: number;
      user_id_github: number;
      username: string;
      department_id: object;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      projects: {
        id: number;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      roles: {
        id: number;
        name: string;
        user_roles: {
          id: number;
          user_id: number;
          role_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      department: { name: string };
    }
  ];
}
type NameResponse = {
  code: number;
  data: {
    count: number;
    rows: {
      id: number;
      name: string;
      owner_id: number;
      parent_id: number;
      sort: number;
      created_at: string;
      updated_at: string;
    }[];
  };
  msg: string;
};

// 获取用户信息
interface UserInformation {
  code: number;
  data: Data;
  msg: string;
}

interface UserInforData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: string[];
}

interface UserInforRole {
  id: number;
  name: string;
  is_default: number;
  created_at: string;
  updated_at: string;
  user_roles: Userroles;
  permissions: Permission[];
}

interface UserInforPermission {
  id: number;
  url: string;
  action: string;
  role_permissions: Rolepermissions;
}

interface UserInforRolepermissions {
  id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  updated_at: string;
}

interface UserInforUserroles {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

//获取项目数量
interface ProjectObject {
  code: number;
  data: Data;
  msg: string;
}

interface ProjectData {
  count: number;
  rows: ProjectRow[];
}

interface ProjectRow {
  id: number;
  name: string;
  parent_id: number;
  manager_id: number;
  project_template_id: number;
  progress: number;
  cover: string;
  is_recycle: number;
  is_archived: number;
  is_private: number;
  is_auto_progress: number;
  state: number;
  intro: string;
  created_at: string;
  updated_at: string;
  creator: Creator;
  collector: any[];
  member: Member[];
}

interface ProjectMember {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: number;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  user_projects: Userprojects;
}

interface ProjectUserprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface ProjectCreator {
  username: string;
  id: number;
  avatar: string;
}

// 获取我的任务数据
type TMyAssignment = IBaseResponse<MyAssignmentData>;
interface MyAssignmentRootObject {
  code: number;
  data: Data;
  msg: string;
}

interface MyAssignmentData {
  count: number;
  rows: MyAssignmentRow[];
}

interface MyAssignmentRow {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark?: any;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: any[];
  executor?: Executor;
  participators: Executor[];
  project: Project;
  likers: any[];
}

interface MyAssignmentProject {
  id: number;
  name: string;
  member: Member[];
}

interface MyAssignmentMember {
  id: number;
  username: string;
}

interface MyAssignmentExecutor {
  id: number;
  username: string;
  avatar: string;
}

type TMyAssignmentParams =
  | {
      limit: number;
      offset: number;
      is_done: number;
      is_recycle: number;
      executor_ids: number;
    }
  | {
      limit: number;
      offset: number;
      is_done: number;
      is_recycle: number;
      participator_id: number;
    }
  | {
      limit: number;
      offset: number;
      is_done: number;
      is_recycle: number;
      creator_id: number;
    };

// 获取用户项目数据
type TUserFileName = IBaseResponse<UserFileNameData>;
interface UserFileNameRootObject {
  code: number;
  data: Data;
  msg: string;
}

interface UserFileNameData {
  count: number;
  rows: UserFileNameRow[];
}

interface UserFileNameRow {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  projects: Project[];
  roles: Role[];
  department?: any;
}

interface UserFileNameRole {
  id: number;
  name: string;
  user_roles: Userroles;
}

interface UserFileNameUserroles {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

interface UserFileNameProject {
  id: number;
  user_projects: Userprojects;
}

interface UserFileNameUserprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

// 获取文件内部数据
type TFileCreate = IBaseResponse<FileCreateData>;
interface FileCreateRootObject {
  code: number;
  data: Data;
  msg: string;
}

interface FileCreateData {
  count: number;
  rows: FileCreateRow[];
}

interface FileCreateRow {
  id: number;
  title: string;
  project_id: number;
  task_id?: any;
  creator_id: number;
  filename: string;
  path: string;
  extension: string;
  file_type: string;
  size: number;
  downloads: number;
  is_recycle: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}

// 上传文件数据请求
interface IUploadData {
  filename: string;
  path: string;
  file_type: string;
  size: string;
  extension: string;
}

interface ImgProjectRootObject {
  code: number;
  data?: any;
  msg: string;
}
interface IdataUrl {
  creator_id: number;
  extension: string;
  file_type: string;
  filename: string;
  path: string;
  project_id: number;
  size: string;
  title: string;
}

interface IdeleteFiles {
  id: number;
  title: string;
  project_id: number;
  creator_id: number;
  filename: string;
  path: string;
  extension: string;
  file_type: string;
  size: number;
  downloads: number;
  is_recycle: number;
  created_at: string;
  updated_at: string;
  created_date: string;
  onEdit: boolean;
  _title: string;
}
