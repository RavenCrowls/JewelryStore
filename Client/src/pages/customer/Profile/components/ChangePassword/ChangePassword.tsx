import { Button, Form, Input, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { PasswordService } from "../../../../../services/auth.service";

type ChangePasswordProps = {
  isGoogleUser: boolean;
};

export default function ChangePassword({ isGoogleUser }: ChangePasswordProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [hasPassword, setHasPassword] = useState(true);

  useEffect(() => {
    // If userProfile.password is null or empty, user registered with Google
    setHasPassword(!isGoogleUser);
  }, [isGoogleUser]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await PasswordService.changePassword({
        currentPassword: hasPassword ? values.oldPassword : "",
        newPassword: values.newPassword
      });
      setSuccess("Đổi mật khẩu thành công");
      form.resetFields();
    } catch (err: any) {
      setError(err.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Đổi mật khẩu</h2>
      {!hasPassword && (
        <Alert
          message="Tài khoản Google không cần nhập mật khẩu cũ."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form layout="vertical" form={form} style={{ maxWidth: 600 }} onFinish={handleSubmit}>
        {hasPassword && (
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
          >
            <label htmlFor="oldPass" className="text-[20px] block mb-2">
              Mật khẩu cũ
            </label>
            <Input.Password size="large" id="oldPass" placeholder="Mật khẩu cũ" />
          </Form.Item>
        )}
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
          ]}
        >
          <label htmlFor="newPass" className="text-[20px] block mb-2">
            Mật khẩu mới
          </label>
          <Input.Password size="large" id="newPass" placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
              }
            })
          ]}
        >
          <label htmlFor="confirmPass" className="text-[20px] block mb-2">
            Xác nhận mật khẩu mới
          </label>
          <Input.Password size="large" id="confirmPass" placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        {success && (
          <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />
        )}
        <Form.Item>
          <Button
            className="!bg-[#4096ff] hover:opacity-80"
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
