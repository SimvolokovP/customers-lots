import { Button, Checkbox, Input, Select, Space } from "antd";
import { FC, useState } from "react";
import { GetCustomersParams } from "../../api/customersService";

interface SearchFiltersProps {
  onSearch: (params: GetCustomersParams) => void;
}

const { Option } = Select;

const SearchFilters: FC<SearchFiltersProps> = ({ onSearch }) => {
  const [customerInn, setCustomerInn] = useState<string>("");
  const [isOrganization, setIsOrganization] = useState<boolean>(false);
  const [isPerson, setIsPerson] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<string>("");

  const handleSearch = () => {
    const params: GetCustomersParams = {
      customer_inn: customerInn || undefined,
      is_organization: isOrganization === true ? true : undefined,
      is_person: isPerson === true ? true : undefined,
      search: search || undefined,
      ordering: ordering || undefined,
    };
    onSearch(params);
  };

  return (
    <Space direction="horizontal" style={{ marginBottom: 16, display: "flex" }}>
      <Input
        placeholder="Search by Customer INN"
        value={customerInn}
        onChange={(e) => setCustomerInn(e.target.value)}
      />
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Checkbox
        checked={isOrganization}
        onChange={(e) => setIsOrganization(e.target.checked)}
      >
        Is Organization
      </Checkbox>
      <Checkbox
        checked={isPerson}
        onChange={(e) => setIsPerson(e.target.checked)}
      >
        Is Person
      </Checkbox>
      <Select
        placeholder="Select Sorting"
        value={ordering}
        onChange={(value) => setOrdering(value)}
        style={{ width: 200 }}
      >
        <Option value="">None</Option>
        <Option value="customer_name">Customer Name</Option>
        <Option value="customer_legal_address">Customer Legal Address</Option>
      </Select>
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
    </Space>
  );
};

export default SearchFilters;
