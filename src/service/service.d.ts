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
      },
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
      },
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
