import React from "react";
import {
  RegisterPageProps,
  useRouterType,
  useLink,
  useActiveAuthProvider,
  useTranslate,
  useRouterContext,
  useRegister,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/antd";
import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from "./styles";
import {
    Row,
    Col,
    Layout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    LayoutProps,
    CardProps,
    FormProps,
    Divider,
    theme, Checkbox,
} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Title} from "../../layout/title";


export interface RegisterFormTypes {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    acceptedTermsOfService: boolean;
}

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  hideForm,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<RegisterFormTypes>();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle = (
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "32px",
              fontSize: "20px",
          }}
      >
          <Title width={120}/>
      </div>
  );

    const CardTitle = (
        <Typography.Title
            level={3}
            style={{
                color: token.colorPrimaryTextHover,
                ...titleStyles,
            }}
        >
            {translate("pages.register.title", "Sign up for your account")}
        </Typography.Title>
  );

/*  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  register({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Typography.Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {translate("pages.login.divider", "or")}
              </Typography.Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };*/

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {!hideForm && (
          <Form<RegisterFormTypes>
              layout="vertical"
              form={form}
              onFinish={(values) => register(values)}
              requiredMark={true}
              {...formProps}
          >
              <Form.Item
                  name="email"
                  label={translate("pages.register.email", "Email")}
                  rules={[
                      {
                          required: true,
                          message: translate(
                              "pages.register.errors.requiredEmail",
                              "Email field is required"
                          ),
                      },
                      {
                          type: "email",
                          message: translate(
                              "pages.register.errors.validEmail",
                              "Invalid email address"
                          ),
                      },
                  ]}
              >
                  <Input
                      size="large"
                      placeholder={translate("pages.register.fields.email", "Email")}
                  />
              </Form.Item>

              <Form.Item
                  name="firstName"
                  label={translate("pages.register.firstName", "First Name")}
                  rules={[
                      {
                          required: true,
                          message: translate(
                              "pages.register.errors.requiredFirstName",
                              "First Name field is required"
                          ),
                      },
                  ]}
              >
                  <Input
                      size="large"
                      placeholder={translate("pages.register.fields.firstName", "First Name")}
                  />
              </Form.Item>

              <Form.Item
                  name="lastName"
                  label={translate("pages.register.lastName", "Last Name")}
                  rules={[
                      {
                          required: true,
                          message: translate(
                              "pages.register.errors.requiredLastName",
                              "Last Name field is required"
                          ),
                      },
                  ]}
              >
                  <Input
                      size="large"
                      placeholder={translate("pages.register.fields.lastName", "Last Name")}
                  />
              </Form.Item>

              <Form.Item
                  name="password"
                  label={translate("pages.register.fields.password", "Password")}
                  rules={[
                      {required: true, message: 'Password field is required'},
                      {min: 12, message: 'Your password length must be at least 12 characters'},
                      {max: 128, message: 'Your password length must not exceed 128 characters'},
                      {pattern: /[A-Z]+/, message: 'Your password must contain at least one uppercase letter'},
                      {pattern: /[a-z]+/, message: 'Your password must contain at least one lowercase letter'},
                      {pattern: /[0-9]+/, message: 'Your password must contain at least one number'},
                      {pattern: /[!?*.]+/, message: 'Your password must contain at least one (!? *.)'},
                      {
                          validator: (_, value) => {
                              if (value) {
                                  const charCountMap: Record<string, number> = {};
                                  for (const char of value) {
                                      if ((charCountMap[char] = (charCountMap[char] || 0) + 1) > 6) {
                                          return Promise.reject('Your password should contain at most 6 duplicate characters');
                                      }
                                  }
                              }
                              return Promise.resolve();
                          }
                      },
                      {
                          validator: (_, value) => {
                              const email = form.getFieldValue('email');
                              if (email && value && email === value) return Promise.reject(
                                  'Your password and email cannot be the same value.');
                              return Promise.resolve();
                          }
                      },
                  ]}
              >
                  <Input.Password
                      size="large"
                      placeholder={translate("pages.login.fields.password", "Password")}
                      iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                  />
              </Form.Item>

              <Form.Item
                  name="confirmPassword"
                  label={translate("pages.register.fields.confirmPassword", "Confirm Password")}
                  dependencies={['password']}
                  rules={[
                      {
                          required: true,
                          message: translate(
                      "pages.register.errors.requiredConfirmPassword",
                      "Confirm Password field is required"
                      ),
                      },
                      ({getFieldValue}) => ({
                          validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                              }
                              return Promise.reject('The new password that you entered do not match');
                          },
                      }),
                  ]}
              >
                  <Input.Password
                      size="large"
                      placeholder={translate("pages.register.fields.confirmPassword", "Confirm Password")}
                      iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                  />
              </Form.Item>

              <Form.Item
                  name="acceptedTermsOfService"
                  valuePropName="checked"
                  rules={[
                      {
                          validator: (_, value) =>
                              value ? Promise.resolve() :
                                  Promise.reject(new Error(
                                      'You must accept the terms of service before continuing'
                                  )),
                      },
                  ]}
              >
                  <Checkbox>
                      I have read and accept the <a target="_blank" href="/terms-of-service">Terms of Service</a>.
                  </Checkbox>
              </Form.Item>

              <Form.Item
                  style={{
                      marginBottom: 0,
                  }}
              >
                  <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={isLoading}
                      block
                  >
                      {translate("pages.register.buttons.submit", "Sign up")}
                  </Button>
              </Form.Item>
              <div
                  style={{
                      marginTop: hideForm ? 16 : 8,
                  }}
              >
                  {loginLink ?? (
                      <Typography.Text
                          style={{
                              fontSize: 12,
                          }}
                      >
                          {translate(
                              "pages.login.buttons.haveAccount",
                              "Have an account?"
                          )}{" "}
                          <ActiveLink
                              style={{
                                  fontWeight: "bold",
                                  color: token.colorPrimaryTextHover,
                              }}
                              to="/login"
                          >
                              {translate("pages.login.signin", "Sign in")}
                          </ActiveLink>
                      </Typography.Text>
                  )}
              </div>
          </Form>
      )}
        {hideForm && loginLink !== false && (
            <div
                style={{
                    marginTop: hideForm ? 16 : 8,
                }}
            >
                <Typography.Text
                    style={{
                        fontSize: 12,
                    }}
                >
                    {translate("pages.login.buttons.haveAccount", "Have an account?")}{" "}
                    <ActiveLink
                        style={{
                            fontWeight: "bold",
                            color: token.colorPrimaryTextHover,
                        }}
                        to="/login"
                    >
                        {translate("pages.login.signin", "Sign in")}
                    </ActiveLink>
                </Typography.Text>
            </div>
        )}
    </Card>
  );

    return (
        <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
            <Row
                justify="center"
                align={hideForm ? "top" : "middle"}
                style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: hideForm ? "15dvh" : "16px",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
