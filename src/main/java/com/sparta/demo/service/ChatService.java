package com.sparta.demo.service;

import com.sparta.demo.model.Debate;
import com.sparta.demo.model.ChatMessage;
import com.sparta.demo.dto.ChatMessageDto;
import com.sparta.demo.dto.TimerResponseDto;
import com.sparta.demo.pubsub.RedisPublisher;
import com.sparta.demo.repository.ChatMessageRepository;
import com.sparta.demo.repository.ChatRoomRepository;
import com.sparta.demo.repository.DebateRepository;
import com.sparta.demo.security.jwt.JwtDecoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    public static final String USER_COUNT = "USER_COUNT"; // 채팅룸에 입장한 클라이언트수 저장

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final DebateRepository debateRepository;

    private final JwtDecoder jwtDecoder;


    public void save(ChatMessageDto messageDto, String token) {
        log.info("save Message : {}", messageDto.getMessage());

        String sender = "";
        String userImage = "";

        Long enterUserCnt = chatMessageRepository.getUserCnt(messageDto.getRoomId());

        if (!(String.valueOf(token).equals("Authorization") || String.valueOf(token).equals("null"))) {
            String tokenInfo = token.substring(7); // Bearer 빼고
            sender = jwtDecoder.decodeNickName(tokenInfo);
            userImage = jwtDecoder.decodeImage(tokenInfo);
        }


        ChatMessage message = new ChatMessage(messageDto);


        message.setSender(sender);
        message.setUserImage(userImage);
        message.setEnterUserCnt(String.valueOf(enterUserCnt));
        Date date = new Date();
        message.setCreatedAt(date); // 시간 세팅

        log.info("type : {}", message.getType());


        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            chatRoomRepository.enterChatRoom(message.getRoomId());
            message.setMessage("[알림] " + message.getSender() + "님이 입장하셨습니다.");
            message.setSender("\uD83D\uDC51 PEECH KING \uD83D\uDC51");
            message.setUserImage(null);
            // timer
            Optional<Debate> debate = debateRepository.findByRoomId(messageDto.getRoomId());
            log.info("Enter일때 endTime: {}", message.getDebateEndTime());
            LocalDateTime localDateTime = LocalDateTime.now();
//            Long debateTime = debate.get().getDebateTime();
//            String debateEndTime = localDateTime.plusMinutes(debateTime).format((DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            message.setDebateEndTime(debateEndTime);
            message.setIsStarted(true);

        } else if (ChatMessage.MessageType.QUIT.equals(message.getType())) {
            message.setMessage("[알림] " + message.getSender() + "님이 나가셨습니다.");
            message.setSender("\uD83D\uDC51 PEECH KING \uD83D\uDC51");
            message.setUserImage(null);
        }

        log.info("ENTER : {}", message.getMessage());
        chatMessageRepository.save(message);
        // Websocket 에 발행된 메시지를 redis 로 발행한다(publish)
        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
    }

    // redis 에 저장되어 있는 message 출력
    public List<ChatMessage> getMessages(String roomId) {
        log.info("getMessages roomId : {}", roomId);
        return chatMessageRepository.findAllMessage(roomId);
    }

}
