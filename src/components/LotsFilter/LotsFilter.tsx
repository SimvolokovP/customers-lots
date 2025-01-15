import { Button, Input, Select, Space } from "antd";
import { FC, useState } from "react";
import { GetLotsParams } from "../../api/lotsService";

const { Option } = Select;

interface LotsFilterProps {
  onFilter: (params: GetLotsParams) => void;
}

const LotsFilter: FC<LotsFilterProps> = ({ onFilter }) => {
  const [nbsRate, setNbsRate] = useState<string | undefined>(undefined);
  const [currencyCode, setCurrencyCode] = useState<string | undefined>(
    undefined
  );
  const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<string>("");

  const handleFilter = () => {
    const params: GetLotsParams = {
      nbs_rate: nbsRate || undefined,
      currency_code: currencyCode || undefined,
      search: search || undefined,
      ordering: ordering || undefined,
    };
    onFilter(params);
  };

  return (
    <Space direction="horizontal" style={{ marginBottom: 16, display: "flex" }}>
      <Select
        placeholder="Select NBS Rate"
        value={nbsRate}
        onChange={(value) => setNbsRate(value)}
        style={{ width: 160 }}
        allowClear
      >
        <Option value="N">N</Option>
        <Option value="OE">OE</Option>
        <Option value="TZ">TZ</Option>
      </Select>
      <Select
        placeholder="Select Currency Code"
        value={currencyCode}
        onChange={(value) => setCurrencyCode(value)}
        style={{ width: 160 }}
        allowClear
      >
        <Option value="R">R</Option>
        <Option value="U">U</Option>
        <Option value="E">E</Option>
      </Select>
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Select Sorting"
        value={ordering}
        onChange={(value) => setOrdering(value)}
        style={{ width: 200 }}
        allowClear
      >
        <Option value="">None</Option>
        <Option value="price">Price</Option>
        <Option value="date_delivery">Delivery Date</Option>
      </Select>
      <Button type="primary" onClick={handleFilter}>
        Filter
      </Button>
    </Space>
  );
};

export default LotsFilter;
