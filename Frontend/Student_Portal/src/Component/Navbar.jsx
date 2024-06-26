import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../Context/authContext';

export const Navbar= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {LoggedIn,handleLogout} =useAuth();
  const navigate=useNavigate();
  
  const handleClick = () => {
    handleLogout();
    navigate("/");
  }

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          borderRadius="none"
        />
        <HStack spacing={8} alignItems="center">
          <Box as={Link} to="/" fontWeight="bold" fontSize="lg" color="blue.700" textDecoration="none">Student Portal Dashboard</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {LoggedIn.isAdmin && (
              <> 
                <Button as={Link} to="/admin/dashboard" _hover={{ bg: 'blue.500', color: 'white' }}>Dashboard</Button>
                <Button as={Link} to="/admin/marks" _hover={{ bg: 'blue.500', color: 'white' }}>Student Marks</Button>

                <Button as={Link} to="/admin/students" _hover={{ bg: 'blue.500', color: 'white' }}>Students</Button>

                <Button as={Link} to="/admin/subjects" _hover={{ bg: 'blue.500', color: 'white' }}>Subject</Button>

                <Button as={Link}  onClick={handleClick} _hover={{ bg: 'blue.500', color: 'white' }}>Logout</Button>
              </>
            )}
            {LoggedIn.isStudent && (
              <>
                <Button  _hover={{ bg: 'blue.500', color: 'white' }}>Profile</Button>
                <Button as={Link} to="/student/performance/" _hover={{ bg: 'blue.500', color: 'white' }}>Performance</Button>
                <Button  onClick={handleClick} _hover={{ bg: 'blue.500', color: 'white' }}>Logout</Button>
              </>
            )}
            {!LoggedIn.isAdmin && !LoggedIn.isStudent && (
              <>
                <Button as={Link} to="/login" _hover={{ bg: 'blue.500', color: 'white' }}>Login</Button>
              </>
            )}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {/* Additional items can be added here */}
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {isAdmin && (
              <>
                <Button as={Link} to="/admin/dashboard" _hover={{ bg: 'blue.500', color: 'white' }}>Dashboard</Button>
                <Button as={Link} to="/admin/logout" _hover={{ bg: 'blue.500', color: 'white' }}>Logout</Button>
              </>
            )}
            {isStudent && (
              <>
                <Button as={Link} to="/student/profile" _hover={{ bg: 'blue.500', color: 'white' }}>Profile</Button>
                <Button as={Link} to="/student/performance" _hover={{ bg: 'blue.500', color: 'white' }}>Performance</Button>
                <Button as={Link} to="/student/logout" _hover={{ bg: 'blue.500', color: 'white' }}>Logout</Button>
              </>
            )}
            {!isAdmin && !isStudent && (
              <>
                <Button as={Link} to="/student/login" _hover={{ bg: 'blue.500', color: 'white' }}>Student Login</Button>
                <Button as={Link} to="/admin/login" _hover={{ bg: 'blue.500', color: 'white' }}>Admin Login</Button>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};


