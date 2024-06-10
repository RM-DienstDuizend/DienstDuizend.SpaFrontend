import React from "react";
import {
    LoginPageProps,
    useLink,
    useRouterType,
    useActiveAuthProvider,
    useLogin,
    useTranslate,
    useRouterContext,
} from "@refinedev/core";
import {
    bodyStyles,
    containerStyles,
    headStyles,
    layoutStyles,
    titleStyles,
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
    Checkbox,
    CardProps,
    LayoutProps,
    Divider,
    FormProps,
    theme,
} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Title} from "../../layout/title";

export interface LoginFormTypes {
    email?: string;
    password?: string;
    oneTimePassword?: boolean;
    redirectPath?: string;
}

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
                                                    registerLink,
                                                    forgotPasswordLink,
                                                    contentProps,
                                                    wrapperProps,
                                                    renderContent,
                                                    formProps,
                                                    hideForm,
                                                }) => {
    const {token} = theme.useToken();
    const [form] = Form.useForm<LoginFormTypes>();
    const translate = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const {Link: LegacyLink} = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const authProvider = useActiveAuthProvider();
    const {mutate: login, isLoading} = useLogin<LoginFormTypes>({
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
            <Title width={120} />
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
            {translate("pages.login.title", "Sign in to your account")}
        </Typography.Title>
    );

    /*const renderProviders = () => {
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
                    login({
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
                <Form<LoginFormTypes>
                    layout="vertical"
                    form={form}
                    onFinish={(values) => login(values)}
                    requiredMark={true}
                    {...formProps}
                >
                    <Form.Item
                        name="email"
                        label={translate("pages.login.fields.email", "Email")}
                        rules={[
                            {
                                required: true,
                                message: translate(
                                    "pages.login.errors.requiredEmail",
                                    "Email is required"
                                ),
                            },
                            {
                                type: "email",
                                message: translate(
                                    "pages.login.errors.validEmail",
                                    "Invalid email address"
                                ),
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder={translate("pages.login.fields.email", "Email")}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={translate("pages.login.fields.password", "Password")}
                        rules={[
                            {
                                required: true,
                                message: translate(
                                    "pages.login.errors.requiredPassword",
                                    "Password is required"
                                ),
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
                        name="oneTimePassword"
                        label={translate("pages.login.fields.oneTimePassword", "OTP")}
                        tooltip="This is an optional field for when you have 2fa enabled."
                    >
                        <Input.OTP formatter={(str) => str.toUpperCase()} size="large" />
                    </Form.Item>
{/*                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "24px",
                        }}
                    >
                        {forgotPasswordLink ?? (
                            <ActiveLink
                                style={{
                                    color: token.colorPrimaryTextHover,
                                    fontSize: "12px",
                                }}
                                to="/forgot-password"
                            >
                                {translate(
                                    "pages.login.buttons.forgotPassword",
                                    "Forgot password?"
                                )}
                            </ActiveLink>
                        )}
                    </div>*/}
                    {!hideForm && (
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={isLoading}
                                block
                            >
                                {translate("pages.login.signin", "Sign in")}
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            )}

            {registerLink ?? (
                <div
                    style={{
                        marginTop: hideForm ? 16 : 8,
                    }}
                >
                    <Typography.Text style={{fontSize: 12}}>
                        {translate(
                            "pages.login.buttons.noAccount",
                            "Don’t have an account?"
                        )}{" "}
                        <ActiveLink
                            to="/register"
                            style={{
                                fontWeight: "bold",
                                color: token.colorPrimaryTextHover,
                            }}
                        >
                            {translate("pages.login.signup", "Sign up")}
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
