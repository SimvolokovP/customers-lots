import { FC, useEffect, useState } from "react";
import { ILot } from "../../models/ILot";
import { Button, Form, Input, Modal, Select } from "antd";
import { ICustomer } from "../../models/ICustomer";
import { CustomersService } from "../../api/customersService";

interface LotInfoModalProps {
  open: boolean;
  lot: ILot | null;
  onClose: () => void;
  onUpdate: (updatedLot: any) => void;
}

const LotInfoModal: FC<LotInfoModalProps> = ({
  open,
  lot,
  onClose,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const [customersList, setCustomersList] = useState<ICustomer[]>([]);

  useEffect(() => {
    const getList = async () => {
      const list = await CustomersService.getCustomers();
      setCustomersList(list);
    };

    getList();
  }, []);

  useEffect(() => {
    if (lot) {
      form.setFieldsValue({
        lot_name: lot.lot_name,
        price: lot.price,
        nbs_rate: lot.nbs_rate,
        currency_code: lot.currency_code,
        place_delivery: lot.place_delivery,
        date_delivery: lot.date_delivery,
        customer_code: lot?.customer_code?.id,
      });
    }
  }, [lot, form]);

  const handleFinish = (values: any) => {
    const updatedValues = {
      ...lot,
      ...values,
    };
    onUpdate(updatedValues);
    onClose();
  };

  return (
    <Modal
      title="Edit Lot Information"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="lot_name"
          label="Lot Name"
          rules={[{ required: true, message: "Please input lot name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="nbs_rate" label="NBS Rate">
          <Select placeholder="Select NBS Rate">
            <Select.Option value="N">N</Select.Option>
            <Select.Option value="OE">OE</Select.Option>
            <Select.Option value="TZ">TZ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="currency_code" label="Currency Code">
          <Select placeholder="Select Currency Code">
            <Select.Option value="R">R</Select.Option>
            <Select.Option value="U">U</Select.Option>
            <Select.Option value="E">E</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="place_delivery"
          label="Place of Delivery"
          rules={[
            { required: true, message: "Please input the place of delivery!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date_delivery"
          label="Delivery Date"
          rules={[{ required: true, message: "Please input a delivery date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item name="customer_code" label="Main Customer">
          <Select placeholder="Select a customer">
            {customersList.map((mainCustomer) => (
              <Select.Option key={mainCustomer.id} value={mainCustomer.id}>
                {mainCustomer.customer_name}
              </Select.Option>
            ))}
          </Select>
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

export default LotInfoModal;
