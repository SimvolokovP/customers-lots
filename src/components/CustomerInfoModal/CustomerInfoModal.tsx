import { FC, useEffect } from "react";
import { Modal, Form, Input, Button, Select, Checkbox } from "antd";
import { ICustomer } from "../../models/ICustomer";

interface CustomerInfoModalProps {
  open: boolean;
  customer: ICustomer | null;
  customersList: ICustomer[];
  onClose: () => void;
  onUpdate: (updatedCustomer: ICustomer) => void;
}

const CustomerInfoModal: FC<CustomerInfoModalProps> = ({
  open,
  customer,
  customersList,
  onClose,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue({
        customer_code: customer.customer_code,
        customer_name: customer.customer_name,
        customer_email: customer.customer_email,
        customer_inn: customer.customer_inn,
        customer_kpp: customer.customer_kpp,
        customer_legal_address: customer.customer_legal_address,
        customer_postal_address: customer.customer_postal_address,
        customer_code_main: customer?.customer_code_main?.customer_name,
        is_organization: customer.is_organization,
        is_person: customer.is_person,
      });
    }
  }, [customer, form]);

  const handleFinish = (values: any) => {
    console.log(values);

    onUpdate({
      ...customer,
      ...values,
    });
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
          name="customer_code"
          label="Customer Code"
          rules={[{ required: true, message: "Please input customer code!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_name"
          label="Customer Name"
          rules={[{ required: true, message: "Please input customer name!" }]}
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
        <Form.Item
          name="customer_inn"
          label="Customer INN"
          rules={[{ required: true, message: "Please input customer INN!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_kpp"
          label="Customer KPP"
          rules={[{ required: true, message: "Please input customer KPP!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_legal_address"
          label="Customer Legal Address"
          rules={[
            { required: true, message: "Please input customer legal address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_postal_address"
          label="Customer Postal Address"
          rules={[
            {
              required: true,
              message: "Please input customer postal address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="customer_code_main" label="Main Customer">
          <Select placeholder="Select a customer">
            {customersList.map((mainCustomer) => (
              <Select.Option key={mainCustomer.id} value={mainCustomer.id}>
                {mainCustomer.customer_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="is_organization" valuePropName="checked">
          <Checkbox>Is Organization</Checkbox>
        </Form.Item>

        <Form.Item name="is_person" valuePropName="checked">
          <Checkbox>Is Person</Checkbox>
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
