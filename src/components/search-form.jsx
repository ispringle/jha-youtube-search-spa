import { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function SearchForm({ setSubmit, placeholder }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(value);
  };

  return (
    <Center>
      <Box m={5}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputGroup>
              <Input
                variant="outline"
                size="md"
                w="auto"
                placeholder={placeholder}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
              <InputRightAddon>
                <Button h="1.25rem" size="sm" type="submit">
                  <Search2Icon />
                </Button>
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}
