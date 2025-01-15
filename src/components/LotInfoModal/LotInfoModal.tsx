import { FC, useEffect } from "react";
import { ILot } from "../../models/ILot";
import { Button, Form, Input, Modal } from "antd";

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

  useEffect(() => {
    if (lot) {
      form.setFieldsValue({
        lot_name: lot.lot_name,
        price: lot.price,
        nbs_rate: lot.nbs_rate,
      });
    }
  }, [lot, form]);

  const handleFinish = (values: any) => {
    onUpdate({ ...lot, ...values });
    onClose();
  };

  return (
    <Modal
      title="Edit lot Information"
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
          label="price"
          rules={[{ required: true, message: "Please input price" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nbs_rate"
          label="nbs_rate"
          rules={[
            {
              required: true,

              message: "Please input a nbs_rate!",
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

export default LotInfoModal;
