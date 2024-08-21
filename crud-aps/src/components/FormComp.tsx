import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const usuarioSchema = z.object({
    usuario: z.object({
      nome: z.string().min(1, "Por favor, informe um nome válido"),
      nomeFantasia: z.string().optional(),
      cnpj: z.string().min(14, "Por favor, informe um CNPJ válido").max(14, "Por favor, informe um CNPJ válido"),
      email: z.string().email("Por favor, informe um E-mail válido."),
      telefone: z.string().min(15, "Por favor, informe um telefone válido"),
      endereco: z.object({
        cep: z.string().min(8, "Por favor, informe um CEP válido"),
        logradouro: z
          .string()
          .min(1, "Por favor, informe um logradouro válido"),
        bairro: z.string().min(1, "Por favor, informe um bairro válido"),
        cidade: z.string().min(1, "Por favor, informe uma cidade válida"),
        uf: z.string().min(2, "Por favor, informar UF válido").max(2, "Por favor, informar UF válido"),
        complemento: z.string().optional(),
      }),
    }),
  });

type FormData = z.infer<typeof usuarioSchema>;

export function FormComp() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm<FormData>({
      resolver: zodResolver(usuarioSchema),
    });
  
    const onSubmit = (data: FormData) => {
      console.log(data);
      onClose();
      reset();
    };

    const onCancel = () => {
        onClose();
        reset();
      };


    //Erro de acesso
    const onBlurCNPJ = async () => {
      const cnpj = getValues('usuario.cnpj');

      if (cnpj)
        try {
          const respostaAPI = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
          const cnpjData = await respostaAPI.json();
          console.log(cnpjData)

          if (!cnpjData.erro) {
            setValue('usuario.endereco.bairro', cnpjData.estabelecimento.bairro);
            setValue('usuario.endereco.cep', cnpjData.estabelecimento.cep);
            setValue('usuario.nomeFantasia', cnpjData.estabelecimento.nome_fantasia);
            setValue('usuario.endereco.logradouro', cnpjData.estabelecimento.logradouro);
            setValue('usuario.endereco.cidade', cnpjData.estabelecimento.cidade.nome);
            setValue('usuario.email', cnpjData.estabelecimento.email);
            setValue('usuario.endereco.uf', cnpjData.estabelecimento.estado.sigla);
            setValue('usuario.endereco.complemento', cnpjData.estabelecimento.complemento);
            setValue('usuario.nome', cnpjData.razao_social);
            setValue('usuario.telefone', cnpjData.estabelecimento.telefone);
            
          } else {
            console.log("CNPJ não encontrado")
          }
      } catch (error) {
        console.error("Erro ao buscar CNPJ:", error);
      }


    };

    const onBlurCep = async () => {
      const cep = getValues('usuario.endereco.cep');
      
      if (cep) {
        try {
          const respostaAPI = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const cepData = await respostaAPI.json();
    
          if (!cepData.erro) {
            setValue('usuario.endereco.bairro', cepData.bairro);
            setValue('usuario.endereco.logradouro', cepData.logradouro);
            setValue('usuario.endereco.cidade', cepData.localidade);
            setValue('usuario.endereco.uf', cepData.uf);
          } else {
            console.log("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        }
      }
    };

    return (
        <>
        <Button onClick={onOpen}>Adicionar Cliente</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar conta de usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                                  
              <FormControl isInvalid={!!errors.usuario?.cnpj}>
                  <FormLabel htmlFor="usuario.cnpj" mt={4} mb={1}>CNPJ</FormLabel>
                  <Input maxLength={14} id="usuario.cnpj" placeholder="Digite apenas os números do CNPJ." {...register('usuario.cnpj')} onBlur={onBlurCNPJ}/>
                  {errors.usuario?.cnpj && (
                    <FormErrorMessage>{errors.usuario.cnpj.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.usuario?.nome}>
                  <FormLabel htmlFor="usuario.nome" mt={4} mb={1}>Nome</FormLabel>
                  <Input id="usuario.nome" placeholder="Nome" {...register('usuario.nome')} />
                  {errors.usuario?.nome && (
                    <FormErrorMessage>{errors.usuario.nome.message}</FormErrorMessage>
                  )}
                </FormControl>
    
                <FormControl isInvalid={!!errors.usuario?.nomeFantasia}>
                  <FormLabel htmlFor="usuario.nomeFantasia" mt={4} mb={1}>Nome Fantasia (opcional)</FormLabel>
                  <Input id="usuario.nomeFantasia" placeholder="Nome Fantasia" {...register('usuario.nomeFantasia')} />
                </FormControl>

                <FormControl isInvalid={!!errors.usuario?.email}>
                  <FormLabel htmlFor="usuario.email" mt={4} mb={1}>E-mail</FormLabel>
                  <Input id="usuario.email" placeholder="E-mail" {...register('usuario.email')} />
                  {errors.usuario?.email && (
                    <FormErrorMessage>{errors.usuario.email.message}</FormErrorMessage>
                  )}
                </FormControl>
                
                <FormControl isInvalid={!!errors.usuario?.telefone}>
                  <FormLabel htmlFor="usuario.telefone" mt={4} mb={1}>Telefone</FormLabel>
                  <Input id="usuario.telefone" placeholder="Telefone" {...register('usuario.telefone')} />
                  {errors.usuario?.telefone && (
                    <FormErrorMessage>{errors.usuario.telefone.message}</FormErrorMessage>
                  )}
                </FormControl>
                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.cep}>
                  <FormLabel htmlFor="usuario.endereco.cep" mt={4} mb={1}>CEP</FormLabel>
                  <Input id="usuario.endereco.cep" placeholder="CEP" {...register('usuario.endereco.cep')} onBlur={onBlurCep}/>
                  {errors.usuario?.endereco?.cep && (
                    <FormErrorMessage>{errors.usuario.endereco.cep.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.logradouro}>
                  <FormLabel htmlFor="usuario.endereco.logradouro" mt={4} mb={1}>Logradouro</FormLabel>
                  <Input id="usuario.endereco.logradouro" placeholder="Logradouro" {...register('usuario.endereco.logradouro')} />
                  {errors.usuario?.endereco?.logradouro && (
                    <FormErrorMessage>{errors.usuario.endereco.logradouro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.bairro}>
                  <FormLabel htmlFor="usuario.endereco.bairro" mt={4} mb={1}>Bairro</FormLabel>
                  <Input id="usuario.endereco.bairro" placeholder="Bairro" {...register('usuario.endereco.bairro')} />
                  {errors.usuario?.endereco?.bairro && (
                    <FormErrorMessage>{errors.usuario.endereco.bairro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.cidade}>
                  <FormLabel htmlFor="usuario.endereco.cidade" mt={4} mb={1}>Cidade</FormLabel>
                  <Input id="usuario.endereco.cidade" placeholder="Cidade" {...register('usuario.endereco.cidade')} />
                  {errors.usuario?.endereco?.cidade && (
                    <FormErrorMessage>{errors.usuario.endereco.cidade.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.uf}>
                  <FormLabel htmlFor="usuario.endereco.uf" mt={4} mb={1}>UF</FormLabel>
                  <Input id="usuario.endereco.uf" placeholder="UF" {...register('usuario.endereco.uf')} />
                  {errors.usuario?.endereco?.uf && (
                    <FormErrorMessage>{errors.usuario.endereco.uf.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.complemento}>
                  <FormLabel htmlFor="usuario.endereco.complemento" mt={4} mb={1}>Complemento</FormLabel>
                  <Input id="usuario.endereco.complemento" placeholder="Complemento" {...register('usuario.endereco.complemento')} />
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit(onSubmit)}>
                Salvar
              </Button>
              <Button onClick={onCancel}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  