interface DictionaryEntry {
  hello: string;
  heroTitle: string;
  signInToYourAccount: string;
  dontHaveAnAccount: string;
  yourEmail: string;
  yourPassword: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  signIn: string;
  signUp: string;
  createYourAccount: string;
  itsFree: string;
  yourFirstName: string;
  yourLastName: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  alreadyHaveAnAccount: string;
  logout: string;
  menuCourses: string;

  //Courses Page
  coursesBreadcrumb: string;
  coursesBreadcrumbDescription: string;
  teach: string;
  learn: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
  en: {
    hello: "Hello",
    heroTitle: "Best Online Course Platform",
    signInToYourAccount: "Sign in to your account",
    dontHaveAnAccount: "Don’t you have an account?",
    yourEmail: "Your Email",
    yourPassword: "Your Password",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot Password?",
    signIn: "Sign In",
    signUp: "Sign Up",
    createYourAccount: "Create Your Account",
    itsFree: "It’s totally free and super easy",
    yourFirstName: "Your First Name",
    yourLastName: "Your Last Name",
    firstNamePlaceholder: "Enter your first name",
    lastNamePlaceholder: "Enter your last name",
    alreadyHaveAnAccount: "Already have an account?",
    logout: "Logout",
    menuCourses: "Courses",
    coursesBreadcrumb: "My Courses",
    coursesBreadcrumbDescription: "This is the page with all of your courses",
    teach: "I am teaching",
    learn: "I am learning",
  },
  ru: {
    hello: "Привет",
    heroTitle: "Лучшая платформа для онлайн обучения",
    signInToYourAccount: "Войдите в свой аккаунт",
    dontHaveAnAccount: "Ещё нет аккаунта?",
    yourEmail: "Ваш Email",
    emailPlaceholder: "Введите ваш email",
    passwordPlaceholder: "Введите ваш пароль",
    yourPassword: "Ваш пароль",
    forgotPassword: "Забыли пароль?",
    signIn: "Войти",
    signUp: "Регистрация",
    createYourAccount: "Создайте свой аккаунт",
    itsFree: "Это полностью бесплатно и супер просто",
    yourFirstName: "Ваше имя",
    yourLastName: "Ваша фамилия",
    firstNamePlaceholder: "Введите ваше имя",
    lastNamePlaceholder: "Введите вашу фамилию",
    alreadyHaveAnAccount: "Уже есть аккаунт?",
    logout: "Выйти",
    menuCourses: "Курсы",
    coursesBreadcrumb: "Мои курсы",
    coursesBreadcrumbDescription: "Это страница со всеми вашими курсами",
    teach: "Я обучаю",
    learn: "Я изучаю",
  },
};
