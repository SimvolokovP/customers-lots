import { FC, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { ICustomer } from "../../models/ICustomer";

interface CustomerInfoModalProps {
  open: boolean;
  customer: ICustomer | null;
  onClose: () => void;
  onUpdate: (updatedCustomer: any) => void;
}

const CustomerInfoModal: FC<CustomerInfoModalProps> = ({
  open,
  customer,
  onClose,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue({
        customer_name: customer.customer_name,
        customer_inn: customer.customer_inn,
        customer_email: customer.customer_email,
      });
    }
  }, [customer, form]);

  const handleFinish = (values: any) => {
    onUpdate({ ...customer, ...values });
    onClose();
  };

  return (
    <Modal
      title="Edit Customer Information"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="customer_name"
          label="Customer Name"
          rules={[{ required: true, message: "Please input customer name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_inn"
          label="Customer INN"
          rules={[{ required: true, message: "Please input customer INN!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_email"
          label="Customer Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerInfoModal;
