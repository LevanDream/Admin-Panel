import { SimpleGrid, Paper, Text, Group, ThemeIcon, Title, Stack } from '@mantine/core';
import { ArrowRight2, Profile2User, TaskSquare } from 'iconsax-reactjs';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <Stack p="lg" gap="xl">
      <div>
        <Title order={1} mb="xs">
          Панель управления
        </Title>
        <Text c="dimmed">
          Выберите нужный раздел для просмотра и редактирования данных
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Paper
          component={Link}
          to="/users"
          withBorder
          p="xl"
          radius="md"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
            cursor: 'pointer',
          }}
          styles={{
            root: {
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 'var(--mantine-shadow-md)',
              },
            },
          }}
        >
          <Group justify="space-between" mb="xs">
            <ThemeIcon size={48} radius="md" variant="light" color="blue">
              <Profile2User size={28} variant="Bold" />
            </ThemeIcon>
            <ArrowRight2 size={20} style={{ opacity: 0.5 }} />
          </Group>

          <Text size="lg" fw={700} mt="md">
            Все пользователи
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Просмотр списка пользователей, добавление новых аккаунтов, редактирование и удаление.
          </Text>
        </Paper>

        <Paper
          component={Link}
          to="/todos"
          withBorder
          p="xl"
          radius="md"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
            cursor: 'pointer',
          }}
          styles={{
            root: {
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 'var(--mantine-shadow-md)',
              },
            },
          }}
        >
          <Group justify="space-between" mb="xs">
            <ThemeIcon size={48} radius="md" variant="light" color="green">
              <TaskSquare size={28} variant="Bold" />
            </ThemeIcon>
            <ArrowRight2 size={20} style={{ opacity: 0.5 }} />
          </Group>

          <Text size="lg" fw={700} mt="md">
            Список задач
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Управление текущими задачами, отметка выполненных и планирование новых дел.
          </Text>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default HomePage;