import { Button, Form, Input } from "antd";

export default function ChangePassword() {
  const [form] = Form.useForm();

  return (
    <div>
      <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
        <Form.Item>
          <label htmlFor="oldPass" className="text-[20px] block mb-2">
            Mật khẩu cũ
          </label>
          <Input.Password size="large" id="oldPass" placeholder="Mật khẩu cũ" />
        </Form.Item>
        <Form.Item>
          <label htmlFor="newPass" className="text-[20px] block mb-2">
            Mật khẩu mới
          </label>
          <Input.Password size="large" id="newPass" placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item>
          <Button className="!bg-[#4096ff] hover:opacity-80" type="primary" size="large">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
