import { message, Space, Table } from "antd";
import { FC, useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import { useLotsStore } from "../../store/useLotsStore";
import { ILot } from "../../models/ILot";
import { LotsService } from "../../api/lotsService";
import LotInfoModal from "../../components/LotInfoModal/LotInfoModal";

const columns = [
  {
    title: "lot_name",
    dataIndex: "lot_name",
    key: "lot_name",
  },
  {
    title: "price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "nbs_rate",
    dataIndex: "nbs_rate",
    key: "nbs_rate",
  },
];

const LotsPage: FC = () => {
  const { lots, fetchLots } = useLotsStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLot, setSelectedLot] = useState<ILot | null>(null);

  useEffect(() => {
    fetchLots();
    console.log(lots);
  }, [fetchLots]);

  const handleOpenModal = async (lot: any) => {
    const targetLot = await LotsService.getLotById(lot.id);

    if (targetLot) {
      setSelectedLot(targetLot);
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedLot(null);
  };

  const handleUpdateCustomer = async (updatedLot: ILot) => {
    try {
      await LotsService.updateLot(updatedLot);
      message.success("Customer updated successfully!");
    } catch (error) {
      message.error("Failed to update customer.");
    } finally {
      fetchLots();
    }
  };

  return (
    <div>
      <Table dataSource={lots} pagination={{ pageSize: 4 }} rowKey="lot_name">
        {columns.map((col) => (
          <Column
            key={col.key}
            {...{ title: col.title, dataIndex: col.dataIndex }}
          />
        ))}
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => handleOpenModal(record)}>
                Edit {record?.lot_name}
              </a>
            </Space>
          )}
        />
      </Table>

      <LotInfoModal
        onUpdate={handleUpdateCustomer}
        open={isModalVisible}
        lot={selectedLot}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LotsPage;
