import { AppShell, Burger, Flex, NavLink, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ROUTES } from "../routes/routes";
import { Profile2User, ArchiveBook } from "iconsax-reactjs";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (opened) toggle();
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Flex align="center" gap="md" ml="lg" h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link
            to={'/'}
            style={{
              textDecoration: 'none',
              color: '#1f1f1f',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Flex align="center" gap="xs">
              <img
                src={logo}
                alt="logo"
                style={{ width: "40px", height: "40px" }}
              />
              <Text fw={700}>CRUD-Tanstack</Text>
            </Flex>
          </Link>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            label="Все пользователи"
            leftSection={<Profile2User />}
            active={location.pathname === ROUTES.USERS}
            onClick={() => handleNavigate(ROUTES.USERS)}
            variant="filled"
          />

          <NavLink
            label="Список задач"
            leftSection={<ArchiveBook />}
            active={location.pathname === "/todos"}
            onClick={() => handleNavigate("/todos")}
            variant="light"
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
