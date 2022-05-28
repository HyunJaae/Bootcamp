package com.sparta.demo.redis.session;

import com.sparta.demo.enumeration.StatusTypeEnum;
import com.sparta.demo.model.Debate;
import com.sparta.demo.repository.DebateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.KeyExpirationEventMessageListener;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Slf4j
public class SessionListener extends KeyExpirationEventMessageListener {

    private final DebateRepository debateRepository;

    /**
     * Creates new {@link MessageListener} for {@code __keyevent@*__:expired} messages.
     *
     * @param listenerContainer must not be {@literal null}.
     * @param debateRepository
     */
    public SessionListener(@Qualifier("redisMessageListenerContainer") RedisMessageListenerContainer listenerContainer, DebateRepository debateRepository) {
        super(listenerContainer);
        this.debateRepository = debateRepository;
    }

    /**
     *
     * @param message   rediskey
     * @param pattern   __keyevent@*__:expired
     */
    @Override
    @Transactional
    public void onMessage(Message message, byte[] pattern) {

        System.out.println("########## onMessage pattern " + new String(pattern) + " | " + message.toString());

        log.info("redis key value: {}, type: {}", Long.valueOf(message.toString()), Long.valueOf(message.toString()).getClass());
        try{
            Debate debate = debateRepository.findByDebateId(Long.valueOf(message.toString())).get();
            log.info("debate있는지 확인 : {}", debate.getTopic());
//            debateRepository.save(debate);
        }catch (Exception e){
            log.info(e.getMessage());
        }
    }

}
